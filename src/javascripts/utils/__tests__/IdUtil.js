jest.unmock("../IdUtil.es");

describe("IdUtil" , function() {
  const IdUtil = require("../IdUtil.es");

  it("it should return correct id" , function(){
    expect(IdUtil.productId({productId:"223344"})).toBe("223344");
    expect(IdUtil.organizationId({organizationId:"hello"})).toBe("hello");
    expect(IdUtil.templateId({templateId:"hello123"})).toBe("hello123");
  });
});