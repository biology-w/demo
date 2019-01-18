package cn.example.demo;


import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class MainTest {
    public static void main(String[] args) {
//        // 不使用框架之前调用
//        // 创建一个对象；
//        SpringHello springHello = new SpringHello();
//        // 为实例对象的属性赋值；
//        springHello.setName("Spring");
//        // 调用实例对象的方法；
//        springHello.sayHello();

        // 使用Spring框架调用
        //创建一个Spring的IOC容器对象
        ApplicationContext context = new ClassPathXmlApplicationContext("spring-config.xml");
        // 从IOC容器中获取Bean实例
        SpringHello springHello = (SpringHello) context.getBean("springHello");
        // 调用实例对象的方法
        springHello.sayHello();
    }
}
