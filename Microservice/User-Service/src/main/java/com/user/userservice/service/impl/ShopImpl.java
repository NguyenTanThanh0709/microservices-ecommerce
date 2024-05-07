package com.user.userservice.service.impl;

import com.user.userservice.entity.Shop;
import com.user.userservice.entity.UserEntity;
import com.user.userservice.reponse.ShopRequest;
import com.user.userservice.repository.ShopRepository;
import com.user.userservice.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ShopImpl {
    private final ShopRepository shopRepository;
    @Autowired
    private UserRepository userRepository;

    @Autowired
    public ShopImpl(ShopRepository shopRepository) {
        this.shopRepository = shopRepository;
    }

    public Shop addShop(ShopRequest shop) {
        Shop shop1 = new Shop();
        shop1.setNameShop(shop.getNameShop());
        shop1.setDes(shop.getDes());
        shop1.setAddress(shop.getAddress());
        UserEntity u = userRepository.findById(shop.getUser_id()).get();
        shop1.setUser(u);
        return shopRepository.save(shop1);
    }

    public Optional<Shop> getShopById(Long id) {
        return shopRepository.findById(id);
    }

    public boolean doesShopExistForUser(Long userId) {
        return shopRepository.findByUserId(userId) != null;
    }

}
