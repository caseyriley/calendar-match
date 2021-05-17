import { mount } from '@vue/test-utils';
import Timeline from '@/components/Timeline';

describe('Timeline', () => {
    it("timeline renders correct text with name:'Casey', startTime:300, breakEnd:840, endTime:1320, calendar:[[840,900]], calNum:1", () => {
        const name = 'Casey';
        const startTime = 300;
        const breakEnd = 840;
        const endTime = 1320;
        const calendar = [[840, 900]];
        const calNum = 1;
        const wrapper = mount(Timeline, {
            props: {
                name,
                startTime,
                breakEnd,
                endTime,
                calendar,
                calNum,
            },
        });
        expect(wrapper.text()).toMatch(
            /CaseyStart Time 5:00 amBreak5:00 am - 2:00 pmBusy2:00 pm - 3:00 pmBreak3:00 pm - 10:00 pmEnd Time10:00 pm/
        );
    });
});
