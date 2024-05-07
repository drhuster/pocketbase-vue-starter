import { mount } from "@vue/test-utils";
import AppVue from "../src/App.vue";
import { describe, expect, test } from "@jest/globals";

describe("App.vue", () => {
  test("renders", () => {
    const wrapper = mount(AppVue, {
      stubs: ["router-view"],
    });

    expect(wrapper.text()).toContain("Pocketbase Vue");
  });
});
