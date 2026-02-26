import React from 'react';

const AsciiTextureStrip = () => {
    return (
        <div className="w-full h-10 flex items-center bg-bg border-t border-b border-[rgba(26,22,18,0.04)] overflow-hidden">
            <div className="whitespace-nowrap flex space-x-4 animate-[marquee_40s_linear_infinite]">
                {/* Repeat the text a few times to ensure standard marquee logic works well enough visually */}
                {[1, 2, 3, 4].map((i) => (
                    <span key={i} className="font-mono text-[12px] text-text-tertiary select-none">
                        ...OTDR_SCAN 00:00:04.221 LOSS:-0.18dB REFL:+0.02dB PORT:A4 LINK:OK...FAULT_ID:null...SYS_CHK:PASS...NODE_7:ACTIVE...LATENCY:1.2ms...FRAME:E8...SYNC:OK...
                    </span>
                ))}
            </div>
        </div>
    );
};

export default AsciiTextureStrip;
