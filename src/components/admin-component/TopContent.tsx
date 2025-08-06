interface props {
    text: string
}

const TopContent = ({text}: props) => {
    return (
        <div className="p-6 border-b-1 border-slate-200">
            <p>
                {text}
            </p>
        </div>
    )
}

export default TopContent;