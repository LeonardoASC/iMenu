import { Input, Typography } from "@material-tailwind/react";

export function InputPhone({ label="Telefone", value, onChange, showHelperText = false, ...props }) {
    const handleInput = (e) => {
        // Remove caracteres que não sejam números
        e.target.value = e.target.value.replace(/\D/g, "");
        return onChange(e);
    };

    return (
        <div className="w-full">
            <Input
                maxLength={11}
                label={label}
                inputMode="numeric" // Ativa teclado numérico em dispositivos móveis
                pattern="\d{11}" // Regex para validar 11 dígitos
                className="appearance-none !border-t-blue-gray-200 placeholder:text-blue-gray-300 placeholder:opacity-100 focus:!border-t-gray-900 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                onInput={handleInput} // Remove caracteres inválidos dinamicamente
                value={value}
                {...props}
            />
            {showHelperText && <Typography className="mt-2 text-xs font-normal text-blue-gray-500">
                Insira o número no formato: DDD + número. Exemplo: 11999784458
            </Typography>}
        </div>
    );
}
