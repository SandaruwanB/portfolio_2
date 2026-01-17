import React from "react";
import WindowContainer from "../components/WindowContainer";


interface BlogProps {
    isOpen: boolean;
    onClose: () => void;
}

const Blog: React.FC<BlogProps> = ({isOpen, onClose}) => {
    return (
        <WindowContainer
            isOpen={isOpen}
            onClose={onClose}
            title="Blog - Portfolio"
            loadingText="Loading blog page..."
        >
            <div>
                
            </div>
        </WindowContainer>
    )
}


export default Blog;