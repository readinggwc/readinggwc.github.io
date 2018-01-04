var answer;
var ready= [1];
var qn = 0;
function make_callback(c, a) {
  return function() {
      $("#question").fadeOut(500);
      window.setTimeout( function() { c(a); }, 650 );
  }
}

function showQuestion(question, choices, callback) {
  $("#question").html("");
  $("#question").append(question);
  for (c in choices) {
    console.log(choices[c]);
    console.log(c);
    choice_id = "choice"+c;
    $("#question").append("<div id="+choice_id+">Choice: " + choices[c] +"</div>");
    $("#"+choice_id).click(make_callback(callback, c));
  }
  $("#question").fadeIn(1000);
}

// Don't modify below this stuff

function setAnswer(a) {
    answer.resolve(a);
}

function askQuestion(question, choices, processAnswer) {
    var current_question = qn;
    qn += 1;
    console.log("Marking "+qn+" as not ready");
    ready[qn] = $.Deferred();
    $.when( ready[current_question] ).done ( function()  {
	    console.log("Ready for "+current_question);
	    showQuestion(question, choices, function(a) {
		    processAnswer(a);
		    ready[current_question+1].resolve(1);
		    console.log("Marked ready for "+current_question);
		})
		}
	);
}

function afterAnswers(callback) {
    var cur = qn;
    qn += 1;
    ready[qn] = $.Deferred();
    $.when( ready[cur] ).done ( function() { 
	    callback();
	    ready[cur+1].resolve(1);
	});
}