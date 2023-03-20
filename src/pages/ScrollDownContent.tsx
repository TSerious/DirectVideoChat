import React from "react";
import { IonContent, IonIcon } from "@ionic/react";
import { AppSettings } from "../data/AppSettings";
import ReactResizeDetector from 'react-resize-detector';

type ScrollDownContentProps = {
    appSettings: AppSettings,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children: any,
}

type ScrollDownContentState = {
    isScrolledDown: boolean,
    scrollY: number,
    showScrollDownIndicator: boolean,
}

class ScrollDownContent extends React.Component<ScrollDownContentProps, ScrollDownContentState>
{

    private contentContainer;
    private content;
    private scrollDownArrow;
    private scrollTolerance = 0;

    constructor(props: ScrollDownContentProps)
    {
        super(props);
        this.state = {
            isScrolledDown: false,
            scrollY: 0,
            showScrollDownIndicator: this.props.appSettings.ShowScrollDownIndicator
        }

        this.content = React.createRef<HTMLDivElement>();
        this.contentContainer = React.createRef<HTMLIonContentElement>();
        this.scrollDownArrow = React.createRef<HTMLIonIconElement>();
    }

    public setScrollTolerance(t:number)
    {
        this.scrollTolerance = t;
        this.updateSize();
    }

    public scrollToTop()
    {
        this.contentContainer.current?.scrollToTop()
        this.setState(() => ({ scrollY: 0 }));
        this.updateIsScrolledDown(0);
    }

    public updateSize()
    {
        this.updateIsScrolledDown(this.state.scrollY);
    }

    private updateIsScrolledDown(y:number)
    {
        if (!this.content.current || !this.contentContainer.current)
        {
            return;
        }

        const scroll = Number(y) +
                     this.scrollTolerance +
                     Number(this.contentContainer.current.clientHeight) +
                     Number(this.props.appSettings.ScrollDownTolerance);

        const contentHeight = this.content.current.clientHeight + this.content.current.offsetTop;

        if ( scroll < contentHeight )
        {
            this.setState(() => ({
                showScrollDownIndicator: this.props.appSettings.ShowScrollDownIndicator,
                isScrolledDown: false
            }));
            return;
        }

        this.setState(() => ({ isScrolledDown: true }));
    }

    render()
    {
        return (
            <ReactResizeDetector
                targetRef={this.contentContainer}
                onResize={() =>
                {
                    this.updateSize();
                }}>
                {() =>
                {
                    return (
                        <>
                            <IonContent
                                ref={this.contentContainer}
                                scrollEvents={true}
                                onIonScroll={(e) =>
                                {
                                    this.setState(() => ({ scrollY: e.detail.currentY }));
                                    this.updateIsScrolledDown(e.detail.currentY);
                                }}
                            >
                                <div ref={this.content}>
                                    {this.props.children}
                                </div>
                            </IonContent>
                            <IonIcon
                                ref={this.scrollDownArrow}
                                hidden={!this.state.showScrollDownIndicator || this.state.isScrolledDown}
                                src = "/assets/ScrollDownArrow.svg"
                                className="scrollDownArrow"/>
                        </>
                    )
                }}

            </ReactResizeDetector>
        )
    }
}

export default ScrollDownContent;