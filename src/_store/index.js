import {alert} from './alert.module';
import {authentication} from './authentication.module';
import {cars} from "@/_store/car.module";
import {tracks} from "@/_store/track.module";
import {authors} from "@/_store/author.module";
import {logs} from "@/_store/logs.module";
import {createStore} from "vuex";


export const store = createStore({
    modules: {
        alert,
        authentication,
        cars,
        tracks,
        authors,
        logs,
    }
});
