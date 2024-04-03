import React from 'react';

const Modal = ({
    children,
    show = false,
    onClose,
}: {
    children: React.ReactNode;
    show: boolean;
    onClose: () => void;
}) => {
    return (
        show && (
            <div className="fixed inset-0 flex items-center justify-center z-20">
                <div onClick={onClose} className="absolute inset-0 z-30 bg-black/60" />
                {children}
            </div>
        )
    );
};

export default Modal;
