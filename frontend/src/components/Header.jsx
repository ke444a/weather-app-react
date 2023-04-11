import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";

export default function Header(props) {
    const { register, handleSubmit } = useForm();

    return (
        <header className="py-2 sm:py-3 lg:py-6 bg-tan text-center">
            <div className="container mx-auto px-2 sm:px-4">
                <h1 className="font-bold sm:mb-2 lg:mb-4 text-xl sm:text-2xl lg:text-3xl text-wild-sand uppercase">
                    Weather Wizard
                </h1>
                <form onSubmit={handleSubmit(props.submitCity)}>
                    <input
                        type="text"
                        {...register("city")}
                        placeholder="Enter a city..."
                        className="bg-wild-sand text-left text-base p-1 sm:p-2 w-3/4 md:w-1/2 lg:w-1/3 border-[1px] border-black rounded-lg focus:outline-none"
                    />
                    <button
                        type="submit"
                        className="bg-wild-sand p-1 sm:p-2 ml-2 border-[1px] border-black rounded-lg active:scale-95 focus:outline-none transition-transform duration-200 ease-in-out"
                    >
                        <FontAwesomeIcon size="lg" icon={faMagnifyingGlass} />
                    </button>
                </form>
            </div>
        </header>
    );
}
