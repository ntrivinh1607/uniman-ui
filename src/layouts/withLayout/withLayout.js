import React from "react";

const withLayout = (layoutProps) => (Layout, Component) => (props) => {
    return (
        <Layout {...layoutProps}>
            <Component {...props} />
        </Layout>
    );
};

export default withLayout;