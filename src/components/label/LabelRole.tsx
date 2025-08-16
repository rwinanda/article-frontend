import { useFormContext } from "react-hook-form";

const LabelRole = () => {
    const dataRole = ["User", "Admin"]
    const { register, formState: { errors } } = useFormContext();

    return (
        <div className="mt-4" >
            <label>
                Role
            </label>
            <select
                className={`w-full px-4 py-2 text-gray-900 bg-white border border-[#E2E8F0] hover:border-gray-500 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.role && "border-red-500 hover:border-red-600"} `}
                {...register('role')}
            >
                {dataRole.map((role, indexRole) => (
                    <option
                        key={indexRole}
                        value={role}
                    >
                        {role}
                    </option>
                ))}
            </select>
            {/* 🛑 Error Display */}
            {
                errors.role && (
                    <p className="text-red-500 text-sm">
                        {(errors.role.message as string)}
                    </p>
                )
            }
        </div >
    )
}

export default LabelRole;