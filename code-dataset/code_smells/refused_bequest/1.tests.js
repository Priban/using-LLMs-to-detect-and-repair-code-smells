const runDescribe = (API, description) => {
  describe(description, () => {
    let api;

    beforeEach(() => {
      api = new API();
    });

    test('should add and check availability of a catalog product', () => {
      api.createCatalogProduct('Laptop', 1500, 10, 2);

      const isAvailable = api.checkAvailability('Laptop');

      expect(isAvailable).toBe(true);
    });

    test('should update inventory and check availability of a catalog product', () => {
      api.createCatalogProduct('Smartphone', 800, 5, 0.5);

      api.updateInventory('Smartphone', -5);
      const isAvailable = api.checkAvailability('Smartphone');

      expect(isAvailable).toBe(false);
    });

    test('should get the shipping cost of a catalog product', () => {
      api.createCatalogProduct('Tablet', 300, 20, 1);

      const shippingCost = api.getShippingCost('Tablet');

      expect(shippingCost).toBe(5.5);
    });

    test('should add and check availability of a tool', () => {
      api.createTool('Hammer', 20, 15);

      const isAvailable = api.checkAvailability('Hammer');

      expect(isAvailable).toBe(true);
    });

    test('should get the maintenance schedule of a tool', () => {
      const tool = api.createTool('Drill', 100, 5);

      const maintenanceSchedule = tool.maintenanceSchedule();

      expect(maintenanceSchedule).toBe('Maintenance required every 6 months for Drill.');
    });

    test('should get the safety guidelines of a tool', () => {
      const tool = api.createTool('Chainsaw', 150, 2);

      const safetyGuidelines = tool.safetyGuidelines();

      expect(safetyGuidelines).toBe('Safety guidelines for Chainsaw:\n1. Wear safety goggles\n2. Keep out of reach of children');
    });
  });
}

module.exports = runDescribe;