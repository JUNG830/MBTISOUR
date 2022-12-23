package com.ISOUR.FINAL.controller;

import com.ISOUR.FINAL.Service.AdminService;
import com.ISOUR.FINAL.entity.MemberInfo;
import com.ISOUR.FINAL.entity.Postbox;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@CrossOrigin(value = "http://localhost:3000")
@RestController
@Slf4j
@RequiredArgsConstructor
public class AdminController {
    // Service(서비스) 로직 연결
    private final AdminService adminService;

    /* 전체 회원 조회 */
    @GetMapping("/GetAllMember")
    public ResponseEntity<List<MemberInfo>> memberList() {
        log.warn("★★★★★★★★★관리자 - 전체 회원 조회 Controller★★★★★★★★★");

        List<MemberInfo> list = adminService.getAllMemberList();
        log.warn(">> 관리자 - 전체 회원 조회 Controller 로 돌아왔습니다.");

        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    /* 관리자 로그인 */
    @PostMapping("/AdminLogin")
    public ResponseEntity<Boolean> adminLogin(@RequestBody Map<String, String> loginData) {
        log.warn("★★★★★★★★★관리자 - 로그인 Controller★★★★★★★★★");

        String getId = loginData.get("id");
        String getPwd = loginData.get("pwd");
        log.warn("입력한 아이디(id) : " + getId);
        log.warn("입력한 비밀번호(pwd) : " + getPwd);

        boolean isTrue = adminService.loginAdmin(getId, getPwd);

        if (isTrue) {
            log.warn(">" + isTrue + " : 로그인 성공 ");
            return new ResponseEntity<>(true, HttpStatus.OK);
        } else {
            log.warn(">" + isTrue + " : 로그인 실패 ");
            return new ResponseEntity<>(false, HttpStatus.OK);
        }
    }


    /* 전체 쪽지함 조회 */
    @GetMapping("/GetAllPostbox")
    public ResponseEntity<List<Postbox>> postList() {
        log.warn("★★★★★★★★★관리자 - 전체 쪽지함 조회 Controller★★★★★★★★★");

        List<Postbox> list = adminService.getAllPostList();
        log.warn(">> 관리자 - 전체 쪽지함 조회 Controller 로 돌아왔습니다.");

        return new ResponseEntity<>(list, HttpStatus.OK);
    }
}
