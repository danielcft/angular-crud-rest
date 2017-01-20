package dk.digitalidentity.sample.angular.server;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by dto on 19/01/17.
 */
@CrossOrigin
@RestController
public class UserService {
    int counter = 0;
    public List<User> users = new ArrayList<User>();


    @RequestMapping(value = "/api/user", method = RequestMethod.GET)
    public ResponseEntity<List<User>> list() {
        return new ResponseEntity<List<User>>(users, HttpStatus.OK);
    }

    @RequestMapping(value = "/api/user/", method = RequestMethod.POST)
    public ResponseEntity<User> add(@RequestBody User user) {
        user.setId(counter++);
        users.add(user);
        System.out.println("Total users : " + users);

        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @RequestMapping(value = "/api/user/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Object> remove(@PathVariable("id") long id) {
        int index = getIndexOfUser(id);
        if(index==-1){
            return new ResponseEntity<Object>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        User user = users.get(index);
        users.remove(index);
        System.out.println("Total users : " + users);

        return new ResponseEntity<Object>(user, HttpStatus.OK);
    }


    int getIndexOfUser(long userId){
        for (int i=0 ; i< users.size(); i++) {
            if(users.get(i).getId()==userId){
                return i;
            }
        }
        return -1;
    }

}
