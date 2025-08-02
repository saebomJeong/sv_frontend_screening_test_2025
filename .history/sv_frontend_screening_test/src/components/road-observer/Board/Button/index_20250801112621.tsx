interface Props {
    onClick: () => void;
    disabled: boolean
}

const Button = ({onClick, disabled}: Props) => {
    return (
        <button type="button"
            onClick={onClick}
            disabled={disabled}
        
    )
}