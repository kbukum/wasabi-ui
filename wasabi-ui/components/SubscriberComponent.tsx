import * as React from "react";
import Component from "./Component";
import {Subscriber, Topic} from "../data/Topic";

export interface SubscriberComponentProps {
    [string: string]: any,
    topicId: string;
}


abstract class SubscriberComponent <P extends SubscriberComponentProps, S> extends Component <P, S> implements Subscriber {
    id: string;
    private topic: Topic;
    public constructor(props: SubscriberComponentProps) {
        super(props);
        this.topic = Topic.getTopic(props.topicId);
    }

    public publish(data: any){
        this.topic.publish(data);
    }

    public abstract onDataChanged(data: any): boolean | any;


}

export default SubscriberComponent;