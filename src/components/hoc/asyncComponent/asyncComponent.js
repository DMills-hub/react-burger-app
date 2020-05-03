import React, { Component } from 'react';

const asyncComponent = (importComponent) => {
    return class extends Component {
        state = {
            component: null
        }

        async componentDidMount() {
            try {
                const cmp = await importComponent();
                this.setState({component: cmp.default})
            } catch (error) {
                
            }
        }

        render() {
            const C = this.state.component;
            return C ? <C {...this.props} /> : null;
        }
    }
}

export default asyncComponent;