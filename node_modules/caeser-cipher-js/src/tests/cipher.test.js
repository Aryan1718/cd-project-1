import { Caesar } from "../modules/cipher";

test("Dispays A Random Multi-Shift: ", () => {
    const shifts = Caesar.getRandomMultiShift(3);
    expect(shifts).toBe(shifts);
});