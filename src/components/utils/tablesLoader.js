import React, { useEffect, useState } from "react";

const TableLoader = ({ text }) => {
    const [message, setMessage] = useState(text);

    useEffect(() => {
        setMessage(text);
    }, [text]);

    return (
        <div className="fd">
            <p className="table-loading-text">
                <span className="text-loder-color">
                    {message} <span className="text-loader"></span>
                </span>
            </p>
        </div>
    );
};

export default TableLoader;
