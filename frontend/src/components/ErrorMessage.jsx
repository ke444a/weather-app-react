import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

const ErrorMessage = () => {
    const [isVisible, setIsVisible] = useState(true);

    return (
        <>
            {isVisible && (
                <div
                    onClick={() => setIsVisible(false)}
                    className="fixed top-4 left-1/2 z-50 flex -translate-x-1/2 cursor-pointer items-center justify-start bg-[#FF715B] p-4 font-heading font-bold text-wild-sand"
                >
                    <FontAwesomeIcon className="mr-2" icon={faTriangleExclamation} />
                    <p>Error! Please, try again!</p>
                </div>
            )}
        </>
    );
};

export default ErrorMessage;