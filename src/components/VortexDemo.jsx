import React from "react";
import { Vortex } from "../components/ui/Vortex";

export function VortexDemo() {
    return (
        <div className="w-full h-screen relative">
            <Vortex
                backgroundColor="black"
                className="flex items-center justify-center px-4 md:px-10 py-6 md:py-8 w-full h-full"
                containerClassName="relative"
            >
                <div className="absolute z-10 flex flex-col items-center justify-center bg-black/50 backdrop-blur-md p-6 rounded-lg transform translate-y-[calc(-98vh)]">
                    <h2 className="text-white text-2xl sm:text-4xl md:text-6xl font-bold text-center shadow-lg">
                        The hell is this?
                    </h2>
                    <p className="text-white text-sm sm:text-lg md:text-2xl max-w-xl mt-6 text-center shadow-lg">
                        This is chemical burn. It&apos;ll hurt more than you&apos;ve ever been burned and you&apos;ll have a scar.
                    </p>
                </div>
            </Vortex>
        </div>
    );
}

