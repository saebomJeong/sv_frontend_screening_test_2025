interface Props {
    onClick: () => void;
    disabled: boolean
}

const Button = ({onClick, disabled}: Props) => {
    return (
        <button type="button"
            onClick={onClick}
            disabled={disabled}
            className="px-6 py-2 rounded-lg font-semibold bg-red-500 text-white hover:bg-red-600 disabled:bg-gray-400 disabled:text-gray-600 disabled:cursor-not-allowed"
    )
}