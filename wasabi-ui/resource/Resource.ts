export interface ResourceProps {
    [string: string] : any
}

abstract class Resource <P extends ResourceProps, E, I> {
    private props: P;
    public constructor(props: P) {
        this.props = props;
    }

    getProps(): P {
        return this.props;
    }
 }

export default Resource;