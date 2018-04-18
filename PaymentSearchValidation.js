var paymentamount_regex = /^[0-9]*$/;
var alpha_regex = /^[a-zA-Z]*$/;
var date_regex = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
var num_regex = /^[0-9]*$/;



$(document).ready(function() {

	// fetching input values

    var checknumber = $('#checknumber').val();
    var paymentleasenumber = $('#paymentleasenumber').val();
    var invoicenumber = $('#invoicenumber').val();
    var paymentamount = $('#paymentamount').val();
	
	
	var fullDate = new Date();
 
	//convert month to 2 digits
	var twoDigitMonth = ((fullDate.getMonth().length+1) === 1)? (fullDate.getMonth()+1) : '0' + (fullDate.getMonth()+1);
	var currentdate = twoDigitMonth + "/" + fullDate.getDate() + "/" + fullDate.getFullYear();
	$('#currdate').val(currentdate);	
	currdate = $('#currdate').datepicker('getDate');
    var prevdate = $('#prevdate').datepicker('getDate');
	$('#currdate').val(currentdate);	
    var prevDt = $('#prevdate').val();
	var currDt = 	$('#currdate').val(currentdate);
	
	
	// On click of final search button validating all the input fields //
	
    $("#paymentsearch").click(function() {

        checknumber = $('#checknumber').val();

        paymentleasenumber = $('#paymentleasenumber').val();

        invoicenumber = $('#invoicenumber').val();

        paymentamount = $('#paymentamount').val();

		currdate = $("#currdate").datepicker('getDate');
        prevdate = $('#prevdate').datepicker('getDate');
		
		prevDt = $('#prevdate').val();
	    currDt = $('#currdate').val();
		
		
		   
        var parts =prevDt.split('/')
	
		var month = parseInt(parts[0]);
			var day = parseInt(parts[1]);
		var year = parseInt(parts[2]); 
		
		var Cr = currDt.split('/')
	
		var monthCr = parseInt(Cr[0]);
			var dayCr = parseInt(Cr[1]);
		var yearCr = parseInt(Cr[2]); 
		
		var yearComp = fullDate.getFullYear();
	    

        var days = Math.round((currdate - prevdate) / 1000 / 60 / 60 / 24);
		// Test for previous date leap year
		var leap;
		if ((year % 400 == 0) || (year % 4 == 0) &&
       !(year % 100 == 0))
	   {
          leap = true;
	   }
		else
		{
          leap = false;
		}

		
		// Test for current date leap year
		var leapCr;
		if ((yearCr % 400 == 0) || (yearCr % 4 == 0) &&
       !(yearCr % 100 == 0))
	   {
          leapCr = true;
	   }
		else
		{
          leapCr = false;
		}

  

        if (checknumber == '' && paymentleasenumber == '' && invoicenumber == '' && paymentamount == '' && prevdate == null) {

            alert("You need to enter atleast one search parameter");

            return false;

        } else if (checknumber !== '' && prevdate == null && currdate == null)

        {

            alert("Date Range required");

            return false;

        } else if (checknumber !== '' && prevdate != null && currdate == null)

        {

            alert("To Date must be entered");

            return false;

        } else if ((!(paymentamount.match(paymentamount_regex))) && prevdate != null)

        {
            alert("Payment Amount must be numeric");

            return false;

        } else if (!(paymentamount.match(paymentamount_regex)) && prevdate == null)

        {

            alert("The date has been defaulted to Today less 6 months");

            alert("Payment Amount must be numeric");
			
		    var tempdate = new Date();
			tempdate.setMonth(tempdate.getMonth() - 6);
			$("#prevdate").datepicker('setDate',tempdate);

            return false;



        } else if ((paymentamount.match(paymentamount_regex)) && prevdate == null)

        {

            alert("The date has been defaulted to Today less 6 months");
			var tempdate = new Date();
			tempdate.setMonth(tempdate.getMonth() - 6);
			$("#prevdate").datepicker('setDate',tempdate);
		
            return false;



        } 
	
		
		else if (prevdate == null)

        {
         
            alert("from date required");

            return false;

        } else if (currdate == null )

        {
       
            alert("To Date must be required");

            return false;

        } 
		else if (!(currDt.match(date_regex)) && !(prevDt.match(date_regex)))
		{	
	    alert('From Date: '+prevDt+' is NOT a valid date. ' );
		alert('To Date: '+currDt+' is NOT a valid date. ' );
        return false;		
		} 
		
	  else if (!(prevDt.match(date_regex)))
		{	
		alert('From Date: '+prevDt+' is NOT a valid date. ' );
        return false;		
		} 
		
		else if(prevDt != "" && (prevDt.match(date_regex)) && ((month < 1) || (month > 12))) // test month range
		{
		alert('From Date: '+month+' is not a valid month ');	
		  return false;
		}
		else if(prevDt != "" && (prevDt.match(date_regex)) && ((day < 1) || (day > 31))) // test general date 
		{
		alert('From Date: '+day+' is not a valid day for month '+month+'');	
		  return false;
		}
		else if (prevDt != "" && (prevDt.match(date_regex)) && ((month == 4) || (month == 6) || (month == 9) || (month == 11)) && (day == 31))  // test 30 Day months
	    {
	    alert('From Date: '+day+' is not a valid day for month '+month+'');
        return false;
		}
		
		 else if (prevDt != "" && prevDt.match(date_regex) && month == 2 && leap && day > 29)      // test February leap years
		 {
	    alert('From Date: '+day+' is not a valid day for month '+month+'of year '+year+' ');
        return false;
		 }
		else if (prevDt != "" && prevDt.match(date_regex) && month == 2 &&  !leap && day > 28)    // test February NON-leap years
		{
	    alert('From Date: '+day+' is not a valid day for month '+month+' of year '+year+' ');
        return false;
		}
		else if (!(currDt.match(date_regex)))
		{	
		alert('To Date: '+currDt+' is NOT a valid date. ' );
        return false;		
		} 
		
		
		else if(currDt != "" && (currDt.match(date_regex)) && ((monthCr < 1) || (monthCr > 12))) // test month range
		{
		alert('To Date: '+monthCr+' is not a valid month ');	
		  return false;
		}
		else if(currDt != "" && (currDt.match(date_regex)) && ((dayCr < 1) || (dayCr > 31))) // test general date 
		{
		alert('To Date: '+dayCr+' is not a valid day for month '+monthCr+'');	
		  return false;
		}
		
		else if (currDt != "" && (currDt.match(date_regex)) && ((monthCr == 4) || (monthCr == 6) || (monthCr == 9) || (monthCr == 11)) && (dayCr == 31))  // test 30 Day months
	    {
	    alert('To Date: '+dayCr+' is not a valid day for month '+monthCr+'');
        return false;
		}
		
		 else if (currDt != "" && currDt.match(date_regex) && monthCr == 2 && leapCr && dayCr > 29)      // test February leap years
		 {
	    alert('To Date: '+dayCr+' is not a valid day for month '+monthCr+' of year '+yearCr+'');
        return false;
		 }
		else if (currDt != "" && currDt.match(date_regex) && monthCr == 2 &&  !leapCr && dayCr > 28)    // test February NON-leap years
		{
	    alert('To Date: '+dayCr+' is not a valid day for month + '+monthCr+'of year '+yearCr+' ');
        return false;
		}
		else if((yearComp - year) > 10)
		{
			alert("From Date: Search limit 10 years back");
			

            return false;
		}
		else if((yearComp - yearCr) > 10)
		{
			alert("To Date: Search limit 10 years back");
			

            return false;
			
		}
		else if (prevdate != "" && currdate != ""  && Date.parse(prevdate) && days > 180)

        {
            alert("Date range cannot be more than 6 months.Please update your date range entry");
			

            return false;

        }
		else if (prevdate != "" && currdate != ""  && Date.parse(prevdate) > Date.parse(currdate))

        {

            alert("From date must be after To date");

            return false;

        } 
      
    }); 
		
	
	

	
    $("#paymentclearbutton").click(function() {
		
		 $('#paymentamount').val("");
		 
        $('#checknumber').val("");

        $('#paymentleasenumber').val("");

		$('#invoicenumber').val("");

		$('#paymentamount').val("");

		$('#prevdate').val("");
		 
         return false;

    });




});