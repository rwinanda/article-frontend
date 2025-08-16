import InputAreaForm from "@/components/input-area/InputAreaForm";

const TitleForm = (
) => {

    return (
        <div className="flex flex-col mt-4">
            <p className="font-medium">
                Title
            </p>
            <InputAreaForm field={"title"} type="text" placeholder="Input Title" />
        </div>
    )
}

export default TitleForm