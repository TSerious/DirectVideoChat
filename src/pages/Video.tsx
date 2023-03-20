import React from "react";
import { AppSettings } from "../data/AppSettings";
import ResponsiveLabel from "./ResponsiveLabel";
import { IonButton, IonInput, IonLabel, IonPage } from "@ionic/react";
import { generateUUID } from "../data/UuidGenerator";
import { AnswerOption, DataConnection, MediaConnection, Peer } from "peerjs";
import { Stream } from "stream";

type VideoProps = {
    appSettings: AppSettings,
}

type VideoState = {
    id: string,
    clientId: string,
    peer: Peer | null,
    connection: DataConnection | null,
}


class Video extends React.Component<VideoProps, VideoState>
{
    private clientVideo;
    private myVideo;

    constructor(props: VideoProps)
    {
        super(props);

        const id = generateUUID();
        this.state = {
            id: id,
            clientId: "",
            peer: this.createPeer(id),
            connection: null,
        }

        this.connect = this.connect.bind(this);
        this.onConnection = this.onConnection.bind(this);
        this.onClose = this.onClose.bind(this);
        this.onDataReceived = this.onDataReceived.bind(this);
        this.send = this.send.bind(this);
        this.makecall = this.makecall.bind(this);
        this.onClientStream = this.onClientStream.bind(this);
        this.showOwnVideo = this.showOwnVideo.bind(this);

        this.clientVideo = React.createRef<HTMLVideoElement>();
        this.myVideo = React.createRef<HTMLVideoElement>();
    }

    private connect()
    {
        if (!this.state.peer)
        {
            console.log("no peer");
            return;
        }

        const connection = this.state.peer.connect(this.state.clientId);
        this.setState(() => ({ connection: connection }));

        connection.on('open', function ()
        {
            console.log("Connected to: " + connection.peer);
        });

        connection.on('data', this.onDataReceived);

        connection.on('close', function () 
        {
            console.log("Connection closed");
        });
    }

    private onDataReceived = (data:any) =>
    {
        console.log("Data recieved: " + data);
        this.state.connection?.send("Answer to " + data);
    }

    
    private onConnection = (c:any) =>
    {
        // Allow only a single connection
        if (this.state.connection != null && this.state.connection.open)
        {
            c.on('open', function()
            {
                c.send("Already connected to another client");
                setTimeout(function() { c.close(); }, 500);
            });
            return;
        }

        this.setState(() => ({ connection: c }));

        console.log("Connected to: " + c.peer);
        
        c.on('data', this.onDataReceived);

        c.on('close', function () 
        {
            console.log("Connection closed");
        });

    }
    

    private onClose()
    {
        this.setState(() => ({ connection: null }));
        console.log('Connection destroyed');
    }

    private createEmptyStream():MediaStream
    {
        const canvas = document.createElement('canvas');
        canvas.width = 640;
        canvas.height = 480;
        const ctx = canvas.getContext('2d');
        if (ctx != null)
        {
            ctx.fillStyle = 'red';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        return canvas.captureStream();
    }

    private createPeer(id:string):Peer
    {
        const peer = new Peer(id);
        peer.on('open', function (id)
        {
            // Workaround for peer.reconnect deleting previous id
            if (peer.id === null)
            {
                console.log('Received null id from peer open');
            }
            else
            {
                console.log('id received:' + peer.id);
            }

            console.log('peer openend. ID: ' + peer.id);
        });

        peer.on('connection', this.onConnection);

        peer.on('disconnected', function ()
        {
            console.log('Connection lost. Please reconnect');

            // Workaround for peer.reconnect deleting previous id
            /*
            peer.id = lastPeerId;
            peer._lastServerId = lastPeerId;
            peer.reconnect();
            */
        });

        peer.on('close', this.onClose);
        peer.on('error', function (err)
        {
            console.log("Error: " + err);
        });

        peer.on("call", async (call) =>
        {
            let stream = null;
            try
            {
                stream = await navigator.mediaDevices.getUserMedia({ video: true });
            }
            catch (err)
            {
                console.info("Failed to get local stream.", err);
                console.info("Answering with static stream.");
                stream = this.createEmptyStream();
            }

            call.answer(stream); // Answer the call with an A/V stream.
            call.on("stream", this.onClientStream);

            if (!this.myVideo.current)
            {
                console.log("No element available to show local stream.");
                return;
            }

            this.myVideo.current.srcObject = stream;
        });

        return peer;
    }

    private onClientStream = (stream:MediaStream) =>
    {
        if (!this.clientVideo.current)
        {
            console.log("No element available to show client video stream.");
            return;
        }

        this.clientVideo.current.srcObject = stream;
    }

    private send()
    {
        if (!this.state.connection)
        {
            console.log("no connection");
            return;
        }

        this.state.connection.send("Hello PeerJs.");
    }

    private makecall()
    {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then((stream) =>
            {
                if (!this.myVideo.current)
                {
                    console.log("no my video available.");
                    return;
                }

                this.myVideo.current.srcObject = stream;

                if (this.state.peer == null)
                {
                    console.log("Couldn't make call, cause peer is null.");
                    return;
                }

                console.log("Calling " + this.state.clientId);

                const call = this.state.peer.call(this.state.clientId, stream);
                call.on("stream", (remoteStream) =>
                {
                    console.log("got stream, after calling " + this.state.clientId);

                    if (!this.clientVideo.current)
                    {
                        console.log("no my video available.");
                        return;
                    }

                    this.clientVideo.current.srcObject = remoteStream;
                    this.clientVideo.current.load();
                    this.clientVideo.current.play();
                });
            })
            .catch((err) =>
            {
                console.error("Failed to get local stream", err);
            });
    }

    private showOwnVideo()
    {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then((stream) =>
            {
                if (!this.myVideo.current)
                {
                    console.log("no my video available.");
                    return;
                }

                this.myVideo.current.srcObject = stream;
            })
            .catch((err) =>
            {
                console.error("Failed to get local stream", err);
            });
    }

    render() 
    {
        return (
            <IonPage>
                <IonLabel>Client Video</IonLabel>
                <video ref={this.clientVideo} width="200px" height="200px" autoPlay/>
                <IonLabel>My Video</IonLabel>
                <video ref={this.myVideo} width="100px" height="100px" autoPlay/>
                <IonLabel>MyID:</IonLabel>
                <IonInput
                    value={this.state.id}
                    onIonChange={ev =>
                    {
                        const s = (ev.target as HTMLIonInputElement).value as string;
                        this.setState(() => ({ id: s }));
                    }}
                />
                <IonLabel>ClientID:</IonLabel>
                <IonInput
                    value={this.state.clientId}
                    onIonChange={ev =>
                    {
                        const s = (ev.target as HTMLIonInputElement).value as string;
                        this.setState(() => ({ clientId: s }));
                    }}
                />
                <IonButton onClick={() => this.connect()}>Connect</IonButton>
                <IonButton onClick={() => this.send()}>Send</IonButton>
                <IonButton onClick={() => this.makecall()}>Call</IonButton>
                <IonButton onClick={() => this.showOwnVideo()}>Show Video</IonButton>
            </IonPage>
        )
    }
}

export default Video;