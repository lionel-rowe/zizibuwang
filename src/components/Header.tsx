import React from "react";
import Typography from "@material-ui/core/Typography";

export default () => {
    return (
        <header
            style={{
                color: 'antiquewhite',
                textAlign: 'center',
                padding: '2em',
            }}
        >
            <Typography variant='h1' component='h1'>
                字字不忘
            </Typography>
        </header>
    );
};
