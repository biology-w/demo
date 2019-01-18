package cn.example.demo;

public class SpringHello {
    private String name;

    public SpringHello() {
        System.out.println("This is SpringHello constructor");
    }

    public void setName(String name) {
        System.out.println("This is SpringHello setName()");
        this.name = name;
    }

    public void sayHello() {
        System.out.println("Hello " + name);
    }
}
