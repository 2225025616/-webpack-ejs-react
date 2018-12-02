export default class DeviceUtil {
    static isMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    static isDesktop() {
        return !DeviceUtil.isMobile();
    }
}