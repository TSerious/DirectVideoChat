import React from 'react';
import ReactResizeDetector from 'react-resize-detector';
import '../theme/ResponsiveLabel.css'

type ResponsiveLabelProps = {
    text: string,
    initialFontSize: number,
    font: string,
    rows: number,
    maxRows: number,
    textAlign: string,
    color: string,
    cursor: string,
};

class ResponsiveLabel extends React.Component<ResponsiveLabelProps, object>
{

    private _text = "";
    private _fontSize = 1;
    private initialFontSize = 1;
    private _font = "";
    private _rows = 1;
    private _maxRows = 1;
    private _textAlign = "";
    private _mode = "";
    private _color = "#000000";
    private _cursor = "default";

    private div;
    private txtArea;

    constructor(props: ResponsiveLabelProps)
    {
        super(props);
        this.div = React.createRef<HTMLDivElement>();
        this.txtArea = React.createRef<HTMLTextAreaElement>();
        this.initialFontSize = props.initialFontSize;
        this._fontSize = this.initialFontSize;
        this._text = props.text;
        this._font = props.font;
        this._maxRows = props.maxRows;
        this._textAlign = props.textAlign;
        this._color = props.color;
        this._cursor = props.cursor;
        this._rows = props.rows;

        this.updateView();
    }

    get testAlign():string { return this._textAlign }
    get mode():string { return this._mode }

    public setText(text:string, update = true)
    {
        this._text = text;

        if (update)
        {
            this.updateView();
        }
    }

    public setTextAlign(textAlign:string, update = true)
    {
        this._textAlign = textAlign;

        if (update)
        {
            this.updateView();
        }
    }

    public setMode(mode:string, update = true)
    {
        this._mode = mode;

        if (update)
        {
            this.updateView();
        }
    }

    public setInitialFontSize(initialFontSize:number, update = true)
    {
        this.initialFontSize = initialFontSize;

        if (update)
        {
            this.updateView();
        }
    }

    public setRows(rows:number, update = true)
    {
        this._rows = rows;

        if (update)
        {
            this.updateView();
        }
    }

    public setMaxRows(maxRows:number, update = true)
    {
        this._maxRows = maxRows;

        if (update)
        {
            this.updateView();
        }
    }

    public setCursor(cursor:string, update = true)
    {
        this._cursor = cursor;

        if (update)
        {
            this.updateView();
        }
    }

    public getWidth():number
    {
        if (this.div.current)
        {
            return this.div.current.clientWidth;
        }
        else
        {
            return 0;
        }
    }

    public updateView()
    {
        if (this && this.div && this.div.current && this.txtArea.current)
        {
            this.txtArea.current.style.setProperty("text-align", this.testAlign);
            this.txtArea.current.style.setProperty("text-align-last", this.testAlign);

            if (this.div.current.clientWidth <= 0)
            {
                return;
            }

            const targetWidth = this.div.current.clientWidth;
            if (this.getTextWidth(this._fontSize, this._font, this._text) > targetWidth)
            {
                this._rows = this._maxRows;

                while (this.getTextWidth(this._fontSize, this._font, this._text) > (targetWidth * this._maxRows) && this._fontSize > 2)
                {
                    this._fontSize--;
                }

                if (this._maxRows >= 2)
                {
                    while (this.getTextWidth(this._fontSize, this._font, this._text) < (targetWidth * this._maxRows) && this._fontSize < this.initialFontSize)
                    {
                        this._fontSize++;
                    }
                }

                this._fontSize--;
                this.txtArea.current.style.setProperty("font-size", this._fontSize + "px");
            }
            else
            {
                this._rows = 1;

                while (this.getTextWidth(this._fontSize, this._font, this._text) < targetWidth && this._fontSize < this.initialFontSize)
                {
                    this._fontSize++;
                }

                this.txtArea.current.style.setProperty("font-size", this._fontSize + "px");
            }

            this.txtArea.current.rows = this._rows;

            if (this.txtArea.current.clientHeight < this.div.current.clientHeight)
            {
                const d = Math.round((this.div.current.clientHeight - this.txtArea.current.clientHeight) / 2) - 1;
                this.txtArea.current.style.setProperty("margin-top", d + "px");
            }

            while (this.txtArea.current.scrollHeight > this.txtArea.current.clientHeight)
            {
                this._fontSize--;
                this.txtArea.current.style.setProperty("font-size", this._fontSize + "px");
            }

            if (this.mode === "ios")
            {
                this.txtArea.current.style.setProperty("font-size", (this._fontSize++) + "px");
            }
        }
    }

    private getTextWidth(fontSize: number, font: string, txt: string): number
    {
        const element = document.createElement('canvas');
        const context = element.getContext("2d");
        let width = 0;

        if (context)
        {
            context.font = fontSize + "px " + font;
            width = context.measureText(txt).width;
        }

        return width;
    }

    render()
    {
        return (
            <ReactResizeDetector targetRef={this.div}>
                {() =>
                {
                    this.updateView();
                    return (
                        <div
                            ref={this.div}
                            style={{ background: "transparent", zIndex:9999999 }}
                            className="fadeIn"
                            onAnimationEndCapture={() => this.updateView()}
                        >
                            <textarea
                                ref={this.txtArea}
                                className="responsiveTextArea"
                                value={this._text}
                                style={{ background: "transparent", border: 0, width: "100%", height: "100%", resize: "none", fontFamily: this._font, color: this._color, cursor: this._cursor }}
                                readOnly/>
                        </div>
                    )
                }}
            </ReactResizeDetector>
        )
    }
}

export default ResponsiveLabel;