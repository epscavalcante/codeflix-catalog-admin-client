import { ModalState } from "../components/BaseModal.vue";
import EventBus from "../events/bus";

const EVENT_NAME = 'modal:toggle';

export default function useModal() {

    function open(payload: ModalState) {
        console.log('open', payload)        
        EventBus.emit(
            EVENT_NAME,
            {
                ...payload,
                isActive: true,
            }
        )
    }

    function close(payload: ModalState) {
        EventBus.emit(
            EVENT_NAME,
            {
                ...payload,
                isActive: false,
            }
        )
    }

    function listen(callback: Function) {
        EventBus.on(
            EVENT_NAME,
            callback
        )
    }

    function off(callback: Function) {
        EventBus.off(
            EVENT_NAME,
            callback
        )
    }

    return {
        open,
        close,
        listen,
        off
    }
}