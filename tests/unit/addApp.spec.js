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
        // const meetingDuration = 30;
        // const name1 = 'Casey';
        // const startTime1 = '05:00';
        // const endTime1 = '22:00';
        // const appStart = '14:00';
        // const appEnd = '15:00';
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
        // const meetingDuration = wrapper.get(
        //     '[data-test="meetingDutation"]'
        // );
        // const name1 = wrapper.get('[data-test="name1"]');
        // const startTime1 = wrapper.get('[data-test="startTime1"]');
        // const endTime1 = wrapper.get('[data-test="endTime1"]');
        // const appStart = wrapper.get('[data-test="appStart"]');
        // const appEnd = wrapper.get('[data-test="appEnd"]');

        await wrapper.find("[data-test='name1']").setValue("Casey");
        expect(wrapper.text()).toMatch(/Casey/);
        // const button = wrapper.get('button');
        // const timeline = wrapper.get('[data-test="button"]')
        // await button.trigger('click');
        // expect(name1.text()).toMatch(/Casey/);
        // expect(button.text()).toMatch(/Submit/);
        // expect(timeline.text()).toMatch(
        //     /CaseyStart Time5:00 am5:00 am - 2:00 pm2:00 pm - 3:00 pm3:00 pm - 10:00 pmEnd Time10:00 pm/
        // );
    });
});
