/*globals $ equal module expect myStatechart Stativus*/
var SC, stateTransitions;
var runGetSetTests = function(){  
  module("Module: Data Get/Set", {
    setup: function(){
      var sc = Stativus.createStatechart();
      var docEnter = {
        enterState: function() {
            this.setData(this.name, this.name+'_data');
        }
      };
      sc.addState("#application", docEnter, {
        substatesAreConcurrent: true
      });
      sc.addState("#subapplication", docEnter, { // This state isn't entered
        parentState: "#application",
        substatesAreConcurrent: true
      });
  
      sc.addState("#first", docEnter, {
        parentState: "#subapplication"
      });
  
      sc.addState("#second", docEnter, {
        parentState: "#subapplication"
      });
      sc.initStates("#application");
      SC = sc;
    }
  });
  
  test("Can get local value", function() {
    expect(2);
    var state = SC.getState('#first');
    ok(state, "State exists...");
    equal(state.getData('#first'), '#first_data', "Current state has local data" );
  });
  
  test("Can get parent value", function() {
    expect(2);
    var state = SC.getState('#first');
    ok(state, "State exists...");
    equal(state.getData('#subapplication'), '#subapplication_data', "Current state has parent data" );
  });

  test("Can get root parent value", function() {
    expect(2);
    var state = SC.getState('#first');
    ok(state, "State exists...");
    equal(state.getData('#application'), '#application_data', "Current state has root parent data" );
  });
  
};
