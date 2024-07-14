const runDescribe = (API, description) => {
    describe(description, () => {
        let api;

        beforeEach(() => {
            api = new API();
        });

        test('should calculate credit score correctly for given user data', () => {
            const user = {
                paymentHistory: 92,
                creditUtilization: 25,
                creditHistoryLength: 10,
                creditMix: 3,
                newInquiries: 2
            };
            const score = api.calculateScore(user);
            expect(score).toBe(810);
        });
    });
}

module.exports = runDescribe;