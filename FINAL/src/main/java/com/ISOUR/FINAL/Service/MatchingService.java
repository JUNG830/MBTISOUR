package com.ISOUR.FINAL.Service;

import com.ISOUR.FINAL.dto.MatDTO;
import com.ISOUR.FINAL.repository.MatchingRepository;
import com.ISOUR.FINAL.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.qlrm.mapper.JpaResultMapper;
import org.springframework.stereotype.Service;
import javax.persistence.*;
import javax.transaction.Transactional;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class MatchingService {

    private final MatchingRepository matchingRepository;
    private final MemberRepository memberRepository;

    @PersistenceContext
    EntityManager em;

    // MySql 버전
    public List<MatDTO> Mat_MemberListPage(String id, int id_num, int num) {
        log.warn("★★★★★★★★★매칭 회원 조회 서비스★★★★★★★★★");
        log.warn("★★★★★★★★ 아이디 : " + id);
        log.warn("★★★★★★★★ 페이지넘버 : " + num);
        log.warn("★★★★★★★★ 아이디넘 : " + id_num);

        String sql2 = "SELECT PG2.*\n" +
                "FROM (SELECT PG1.*\n" +
                "\t\t\t, @ROWNUM \\:= @ROWNUM + 1 as R_NUM\n" +
                "       FROM (SELECT\n" +
                "              \t\tim.ID_NUM AS user_id_num\n" +
                "                , im.MBTI AS user_mbti\n" +
                "                , im2.ID_NUM AS mat_id_num\n" +
                "                , im2.ID AS mat_id\n" +
                "                , im2.FACE AS mat_face\n" +
                "                , im2.NICKNAME AS mat_nick\n" +
                "                , im2.MBTI AS mat_mbti\n" +
                "                , im2.INTRODUCE AS mat_introduce\n" +
                "                , m.ORDER_MBTI AS order_mbti\n" +
                "                , COUNT(*) OVER (PARTITION BY im.ID_NUM) as cnt\n" +
                "                , IFNULL((\n" +
                "\t                select 'Y'\n" +
                "\t                from isour.like_member lm \n" +
                "\t                where lm.like_user_idx = im2.id_num\n" +
                "\t                ), 'N') as like_Member_idx\n" +
                "                FROM isour.i_member im\n" +
                "                \tINNER JOIN isour.MBTI m\n" +
                "\t                ON im.MBTI = m.USER_MBTI\n" +
                "\t                INNER JOIN isour.i_member im2\n" +
                "\t                ON im2.MBTI = m.MAT_MBTI\n" +
                "                WHERE im.ID = ? \n" +
                "\t                and m.ORDER_MBTI <= 1\n" +
                "\t                and not im.ID_NUM = im2.ID_NUM\n" +
                "                ORDER BY rand(?)) PG1\n" +
                "        WHERE (@rownum \\:= 0) = 0 <= /*count*/2 * /*startNum*/?) PG2\n" +
                "WHERE R_NUM > /*count*/2 * (/*startNum*/? - 1)\n" +
                "limit /*count*/2;";

        JpaResultMapper result2 = new JpaResultMapper();
        Query query2 = em.createNativeQuery(sql2)
                .setParameter(1, id)
                .setParameter(2, id_num)
                .setParameter(3, num)
                .setParameter(4, num);
        List<MatDTO> list = result2.list(query2, MatDTO.class);
        log.warn("매칭 결과 : " + list);
        return list;
    }
}


