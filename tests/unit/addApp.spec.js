import { mount, shallowMount } from '@vue/test-utils';
import LandingPage from '@/components/LandingPage';

describe('LandingPage', () => {
    it("has text containing 'available appointment times'", () => {
        const wrapper = shallowMount(LandingPage);
        expect(wrapper.text()).toMatch(/available appointment times/);
    });

    it("has text containing 'Find all'", () => {
        const wrapper = mount(LandingPage);
        expect(wrapper.text()).toMatch(/Find all/);
    });

    it('LandingPage renders timeline with 3 appointments', async () => {
        const wrapper = mount(LandingPage, {
            // props: {
            //     meetingDuration,
            //     name1,
            //     startTime1,
            //     endTime1,
            //     appStart,
            //     appEnd,
            // },
        });

        const button = wrapper.get('button');

        await wrapper
            .find("[data-test='meetingDuration']")
            .setValue(30);
        await wrapper.find("[data-test='name1']").setValue('Casey');
        await wrapper
            .find("[data-test='startTime1']")
            .setValue('05:00');
        await wrapper
            .find("[data-test='endTime1']")
            .setValue('22:00');
        await wrapper
            .find("[data-test='appStart']")
            .setValue('14:00');
        await wrapper.find("[data-test='appEnd']").setValue('15:00');

        await button.trigger('click');

        const timelineName = wrapper.get(
            '[data-test="timeline-name"]'
        );

        expect(wrapper.text()).toMatch(/Casey/);
        expect(timelineName.text()).toMatch(/Casey/);
    });
});
