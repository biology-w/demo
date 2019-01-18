package cn.springmvc.helloword;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("hi")
public class HiController {

    @RequestMapping("/say")
    public String say(Model model) {
        model.addAttribute("name", "wormday");
        model.addAttribute("url","https://www.google.com");
        return "say";
    }
}
