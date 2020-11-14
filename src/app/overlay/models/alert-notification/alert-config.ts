export class AlertData {
    type: AlertType;
    text?: string;
    title?: string;
    alertConfig?: AlertConfig;

    constructor(options: {
        type?: AlertType,
        text?: string,
        title?: string,
        alertConfig?: AlertConfig
    } = {}) {
        this.type = options.type;
        this.text = options.text || '';
        this.title = options.title || '';
        this.alertConfig = options.alertConfig || DefaultAlertConfig;
    }
}

export const DefaultAlertConfig: AlertConfig = {
    position: {
        top: 80,
        right: 20,
    },
    animation: {
        fadeOut: 700,
        fadeIn: 300,
    },
};

export enum AlertType {
    warning = "warning",
    success = "success",
    info = "info"
}

export interface AlertConfig {
    position?: {
        top: number;
        right: number;
    };
    animation?: {
        fadeOut: number;
        fadeIn: number;
    };
}
