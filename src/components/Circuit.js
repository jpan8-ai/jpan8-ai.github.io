import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

function Circuit({width, height, unitLength}) {
    const [circuitBoard, setCircuitBoard] = useState([]);
    const [cursor, setCursor] = useState([0, 0]);

    useEffect(() => {
        let circuit = [];
        for(var i = 0; i < height; i ++) {
            let row = [];
            for(var j = 0; j < width; j ++) {
                row = [...row, 0];
            }
            circuit = [...circuit, row];
        }
    }, []);

    return (
        <div className="flex items-center justify-center h-screen bg-black">
            <svg
                viewBox="0 0 500 300"
                className="w-[500px] h-[300px]"
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* Circuit Path */}
                <motion.path
                    d="M 50 150 H 150 V 50 H 350 V 250 H 150 V 150 H 450"
                    stroke="#00ff99"
                    strokeWidth="4"
                    fill="none"
                    strokeLinecap="round"
                    initial={{ strokeDasharray: 1000, strokeDashoffset: 1000 }}
                    animate={{
                        strokeDashoffset: [1000, 0],
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                />

                {/* Resistor Icon */}
                <motion.rect
                    x="140"
                    y="140"
                    width="20"
                    height="20"
                    fill="#ffcc00"
                    stroke="#ffffff"
                    strokeWidth="1"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [1, 0.5, 1],
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />

                {/* LED Icon */}
                <motion.circle
                    cx="350"
                    cy="250"
                    r="10"
                    fill="#ff4444"
                    animate={{
                        scale: [1, 1.5, 1],
                        opacity: [1, 0.6, 1],
                    }}
                    transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            </svg>
        </div>
    );
}

export default Circuit;