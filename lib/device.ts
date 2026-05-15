export const getDeviceId = (): string => {
    if (typeof window === "undefined") {
        return "";
    }

    let deviceId = localStorage.getItem("deviceId");
    if (!deviceId) {
        deviceId ="DEV-" + Date.now().toString() + "-" + Math.random().toString(36).substring(2, 10).toUpperCase();
        localStorage.setItem("deviceId", deviceId);
    }

    return deviceId;
};