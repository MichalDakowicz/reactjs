import { useState } from "react";

export default function Checkbox({ label }) {
    const [checked, setChecked] = useState(false);

    return (
        <label className="flex items-center cursor-pointer">
            <input
                type="checkbox"
                checked={checked}
                onChange={() => setChecked(!checked)}
                className="peer hidden"
            />
            <div
                className={`h-5 w-5 rounded-md border-2 flex items-center justify-center 
          transition-colors duration-300 
          ${
              checked
                  ? "border-blue-500 bg-blue-500"
                  : "border-gray-500 bg-transparent"
          } 
          peer-hover:border-blue-400`}
            >
                {checked && (
                    <svg
                        id="Capa_1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        x="0px"
                        y="0px"
                        viewBox="0 0 469.184 469.185"
                        className="w-4 h-4 text-white"
                        xmlSpace="preserve"
                    >
                        <g>
                            <path fill="currentColor" d="M462.5,96.193l-21.726-21.726c-8.951-8.95-23.562-8.95-32.59,0L180.368,302.361l-119.34-119.34 c-8.95-8.951-23.562-8.951-32.589,0L6.712,204.747c-8.95,8.951-8.95,23.562,0,32.589L163.997,394.62 c4.514,4.514,10.327,6.809,16.218,6.809s11.781-2.295,16.219-6.809L462.27,128.783C471.45,119.68,471.45,105.145,462.5,96.193z" />
                        </g>
                    </svg>
                )}
            </div>
            {label && (
                <h4 className="text-lg font-semibold text-gray-300 peer-hover:text-white transition-colors ml-2">
                    {label}
                </h4>
            )}
        </label>
    );
}
