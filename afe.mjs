// MLX90328 rev.006 table 6 / MLX90329 rev.002 table 7, nominal design only.
// Gain magnitude; ADC direction depends on input polarity. No register write.
export const gainStages=Object.freeze(Array.from({length:32},(_,code)=>{
 const g1=[4.49,5.06,5.8,6.52,7.43,8.37,9.35,10.6][code%8];
 const g2=code<8?1.25:3.5,g3=code<16?1.6:code<24?3.2:6.4;
 return Object.freeze({code,g1,g2,g3,gain:g1*g2*g3});
}));
export function planAFE({span,offset,bridgeV,vdda=3.5,target=50}){
 if(![span,offset,bridgeV,vdda,target].every(Number.isFinite)||span===0||bridgeV<=0||vdda<=0||target<=0||target>100)throw Error('Ungültige AFE-Parameter.');
 const start=offset*bridgeV/1000,end=(offset+span)*bridgeV/1000,mid=(start+end)/2;
 const candidates=gainStages.map(g=>{
  const ideal=-mid*g.g1/(vdda/3)*127;
  const signed=Math.max(-127,Math.min(127,Math.round(ideal)));
  const correction=signed/127*vdda/3;
  const a=(start*g.g1+correction)*g.g2*g.g3,b=(end*g.g1+correction)*g.g2*g.g3;
  const utilization=Math.abs(b-a)/vdda*100,peak=Math.max(Math.abs(a),Math.abs(b));
  return {...g,coarseMagnitude:Math.abs(signed),coarsePolarity:signed<0?1:0,offsetLimited:Math.abs(ideal)>127,utilization,headroom:100*(.5-peak/vdda),adcStart:32768+a/vdda*65536,adcEnd:32768+b/vdda*65536,adcSpan:Math.abs(b-a)/vdda*65536,stepInputUV:vdda/65536/g.gain*1e6,clipped:peak>=vdda/2};
 });
 const allowed=candidates.filter(c=>!c.clipped&&!c.offsetLimited&&c.utilization<=target).sort((a,b)=>b.utilization-a.utilization||b.headroom-a.headroom);
 return {startMV:start*1000,endMV:end*1000,idealGain:vdda*target/100/Math.abs(end-start),recommended:allowed[0]??null,candidates,withinNominalBridge:Math.abs(span)>=2&&Math.abs(span)<=55&&Math.abs(offset)<=20};
}
