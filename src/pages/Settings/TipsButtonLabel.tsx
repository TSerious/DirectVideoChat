import { IonLabel } from "@ionic/react";
import React from "react";
import '../../theme/EditSettings.css'

class TipsButtonLabel extends React.Component<object,object>
{
    render()
    {
        return (
            <IonLabel
                color="tertiary"
                class="tipsButtonLabel">
                ?
            </IonLabel>
        );
    }
}

export default TipsButtonLabel;