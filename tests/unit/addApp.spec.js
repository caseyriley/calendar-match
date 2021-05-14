import {mount, shallowMount} from '@vue/test-utils';
import LandingPage from '@/components/LandingPage';

describe('LandingPage', () => {
    it("has text containing 'available appointment times'", () => {
        const wrapper = shallowMount(LandingPage);
        expect(wrapper.text()).toMatch(/available appointment times/);
    });
});
