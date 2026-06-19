class Student {
    String name;
    int age;

    // Constructor
    Student(String name, int age) {
        this.name = name;
        this.age = age;
    }

    // Method
    void display() {
        System.out.println("Name: " + name);
        System.out.println("Age: " + age);
    }
}

// Inheritance
class CollegeStudent extends Student {
    String course;

    CollegeStudent(String name, int age, String course) {
        super(name, age);
        this.course = course;
    }

    // Method Overriding
    @Override
    void display() {
        super.display();
        System.out.println("Course: " + course);
    }
}

public class Main {
    public static void main(String[] args) {

        // Object Creation
        CollegeStudent s1 =
            new CollegeStudent("Raj", 20, "B.Tech");

        s1.display();
    }
}