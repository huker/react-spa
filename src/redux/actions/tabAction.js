/**
 * Created by huk on 2018/8/15.
 */

export const CHANGE_TAB = "tab/CHANGE_TAB";

export function changeTab(data) {
    return {
        type: CHANGE_TAB,
        data
    }
}