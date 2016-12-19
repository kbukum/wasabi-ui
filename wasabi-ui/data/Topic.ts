import Objects from "../util/Objects";

export interface TopicProps {
    id: string,
    standByDelay?: number,
    data: any
}

export interface TopicMap {
    [string: string]: Topic
}

export interface SubscriberCallback {
    (data: any, topicId?: string): boolean | any;
}

export interface Subscriber {
    id: string,
    onDataChanged: SubscriberCallback;
}

export interface SubscriberMap {
    [string: string]: Subscriber
}


export class Topic {
    private static topicMap: TopicMap;
    private props: TopicProps;
    private subscribers: SubscriberMap;
    private interval: any;

    public constructor(props: TopicProps){
        this.props = props;
        if(!this.props.standByDelay) {
            this.props.standByDelay = -1;
        }
        if(this.props.data) {

        }

        Topic.topicMap[props.id] = this;
        this.configureDelayTime();

    }
    public publish(data: any) {
        this.props.data = data;
        this.broadcast();
    }

    public subscribe(subscriber: Subscriber){
        if(this.interval) {
            clearInterval(this.interval);
        }
        this.subscribers[subscriber.id] = subscriber;
    }

    public unSubscribe(subscriber: Subscriber) {
        delete  this.subscribers[subscriber.id];
        this.configureDelayTime();
    }

    public unSubscribeById(subscriberId: string) {
        delete  this.subscribers[subscriberId];
        this.configureDelayTime();
    }

    public broadcast(){
        Objects.forEach(this.subscribers, this.tell);
    }

    public tell(subscriber: Subscriber, key: string, map: SubscriberMap): boolean | any {
        subscriber.onDataChanged(this.props.data, this.props.id);
    }

    public configureDelayTime(){
        if(this.props.standByDelay !== -1) {
            this.interval = setInterval(this.checkTimeAndDeleteIfNecessary, this.props.standByDelay);
        }
    }

    public checkTimeAndDeleteIfNecessary(){
        let length = Objects.getLength(this.subscribers);
        if(this.interval) {
            clearInterval(this.interval);
        }
        if(length === 0) {
            delete Topic.topicMap[this.props.id];
        }
    }

    public static getTopic(topicId: string){
        return Topic.topicMap[topicId];
    }
}

export default Topic;
