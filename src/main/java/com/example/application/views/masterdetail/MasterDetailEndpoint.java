package com.example.application.views.masterdetail;

import java.util.Arrays;
import java.util.List;

import com.example.application.backend.Employee;
import com.vaadin.flow.server.connect.Endpoint;
import com.vaadin.flow.server.connect.auth.AnonymousAllowed;
import com.vaadin.flow.server.connect.exception.VaadinConnectException;

/**
 * The endpoint for the client-side List View.
 */
@Endpoint
@AnonymousAllowed
public class MasterDetailEndpoint {
    public List<Employee> getEmployees() {
        return Arrays.asList(
            new Employee("Rowena", "Leeming", "rleeming0@bbc.co.uk", "Food Chemist"),
            new Employee("Alvinia", "Delong", "adelong1@altervista.org", "Recruiting Manager"),
            new Employee("Leodora", "Burry", "lburry2@example.com", "Food Chemist"),
            new Employee("Karen", "Oaten", "koaten3@ihg.com", "VP Sales"),
            new Employee("Mariele", "Huke", "mhuke4@washingtonpost.com", "Research Assistant IV"),
            new Employee("Grata", "Widdowes", "gwiddowes5@cargocollective.com", "Actuary"),
            new Employee("Donna", "Roadknight", "droadknight6@apache.org", "Mechanical Systems Engineer"),
            new Employee("Tommi", "Nowland", "tnowland7@biblegateway.com", "Senior Developer"),
            new Employee("Tonya", "Teresia", "tteresia8@boston.com", "Assistant Manager"),
            new Employee("Steffen", "Yon", "syon9@ocn.ne.jp", "Senior Sales Associate"),
            new Employee("Consalve", "Willes", "cwillesa@linkedin.com", "Programmer I"),
            new Employee("Jeanelle", "Lambertz", "jlambertzb@nymag.com", "Operator"),
            new Employee("Odelia", "Loker", "olokerc@gov.uk", "Developer I"),
            new Employee("Briano", "Shawell", "bshawelld@posterous.com", "Research Assistant IV"),
            new Employee("Tarrance", "Mainston", "tmainstone@cmu.edu", "Research Nurse"),
            new Employee("Torrence", "Gehring", "tgehringf@a8.net", "Geological Engineer"),
            new Employee("Augie", "Pionter", "apionterg@ehow.com", "Senior Financial Analyst"),
            new Employee("Marillin", "Aveson", "mavesonh@shop-pro.jp", "Technical Writer"),
            new Employee("Jacquelyn", "Moreby", "jmorebyi@slashdot.org", "Executive Secretary"),
            new Employee("Glenn", "Bangley", "gbangleyj@prlog.org", "Account Executive"),
            new Employee("Isidoro", "Glave", "iglavek@tamu.edu", "Compensation Analyst"),
            new Employee("Cchaddie", "Spatarul", "cspatarull@sun.com", "Business Systems Development Analyst")
        );
    }

    public void saveEmployee(Employee employee) throws VaadinConnectException {
        throw new VaadinConnectException("not implemented");
    }
}
